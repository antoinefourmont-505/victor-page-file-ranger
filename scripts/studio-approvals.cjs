"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MANUAL_APPROVAL_DELIVERY = void 0;
exports.resolveApprovalDelivery = resolveApprovalDelivery;
exports.validateApprovalDelivery = validateApprovalDelivery;
exports.MANUAL_APPROVAL_DELIVERY = { mode: 'manual', channels: [], reviewers: [], policy: 'any' };
/** A defined manual policy is an inheritance boundary; reviewer arrays replace, never merge. */
function resolveApprovalDelivery(...policies) {
    return policies.find(policy => policy !== undefined) || { ...exports.MANUAL_APPROVAL_DELIVERY, channels: [], reviewers: [] };
}
function validateApprovalDelivery(value) {
    const fail = (message) => { throw new Error(message); };
    if (!value || typeof value !== 'object' || Array.isArray(value))
        return fail('Choose an approval delivery policy.');
    const p = value;
    const allowed = ['mode', 'channels', 'reviewers', 'policy', 'quorum', 'phoneConnectionRef', 'callingCoachPageId', 'maxCallMinutes', 'maxCostUsd'];
    if (Object.keys(p).some(key => !allowed.includes(key)))
        return fail('Approval delivery contains an unsupported setting.');
    if (!['manual', 'automatic'].includes(p.mode) || !['any', 'all', 'quorum'].includes(p.policy))
        return fail('Choose manual or automatic delivery and a reviewer policy.');
    if (!Array.isArray(p.channels) || p.channels.length > 2 || p.channels.some(c => !['email', 'phone'].includes(c)) || new Set(p.channels).size !== p.channels.length)
        return fail('Choose email and/or phone delivery.');
    if (!Array.isArray(p.reviewers) || p.reviewers.length > 50)
        return fail('Choose up to 50 reviewers.');
    const identities = new Set();
    for (const r of p.reviewers) {
        if (!r || Object.keys(r).some(key => !['userId', 'name', 'email', 'phone', 'verification'].includes(key)) || typeof r.name !== 'string' || !r.name.trim() || r.name.length > 160)
            return fail('Give each reviewer a name.');
        if (r.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(r.email))
            return fail('Enter a valid reviewer email.');
        if (r.phone && !/^\+[1-9]\d{6,14}$/.test(r.phone))
            return fail('Enter reviewer phone numbers in international format, starting with +.');
        if (!['app', 'email'].includes(r.verification) || (r.verification === 'app' && !r.userId) || (r.verification === 'email' && !r.email))
            return fail('Choose an authenticated reviewer or an email for verification.');
        if (r.userId && (typeof r.userId !== 'string' || r.userId.length > 100))
            return fail('Choose a registered reviewer.');
        const identity = r.userId || r.email?.trim().toLowerCase() || r.phone;
        if (!identity || identities.has(identity))
            return fail('Each reviewer must appear only once.');
        identities.add(identity);
    }
    if (p.policy === 'quorum' && (!Number.isInteger(p.quorum) || p.quorum < 1 || p.quorum > p.reviewers.length))
        return fail('Quorum must fit the reviewer list.');
    for (const key of ['phoneConnectionRef', 'callingCoachPageId'])
        if (p[key] !== undefined && (typeof p[key] !== 'string' || !p[key].trim() || p[key].length > 160))
            return fail('Choose a valid connection and calling coach.');
    if (p.maxCallMinutes !== undefined && (!Number.isFinite(p.maxCallMinutes) || p.maxCallMinutes < 1 || p.maxCallMinutes > 10))
        return fail('Call limit must be 1–10 minutes.');
    if (p.maxCostUsd !== undefined && (!Number.isFinite(p.maxCostUsd) || p.maxCostUsd <= 0 || p.maxCostUsd > 100))
        return fail('Set a positive call spending limit (at most $100).');
    if (p.mode === 'automatic') {
        if (!p.reviewers.length || !p.channels.length)
            return fail('Automatic delivery requires reviewers and channels.');
        if (p.channels.includes('email') && p.reviewers.some(r => !r.email))
            return fail('Automatic email needs an email for every reviewer.');
        if (p.channels.includes('phone') && (!p.phoneConnectionRef || !p.maxCallMinutes || !p.maxCostUsd || p.reviewers.some(r => !r.phone)))
            return fail('Automatic calls need reviewer numbers, a phone connection, duration and spending limits.');
    }
    return JSON.parse(JSON.stringify(p));
}
