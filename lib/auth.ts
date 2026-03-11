import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createHash } from 'crypto';
import { ACCESS_COOKIE, REFRESH_COOKIE, accessCookieOptions, refreshCookieOptions, clearCookieOptions } from './auth-constants';

const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('Missing JWT_SECRET environment variable. Check your .env.local file.');
    }
    return secret;
};

const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

// ─── Payload types ───────────────────────────────────────────────────────────

export interface AccessTokenPayload {
    sub: string;       // user id
    email: string;
    name: string;
    plan: string;
    role: 'user' | 'admin';
    type: 'access';
}

export interface RefreshTokenPayload {
    sub: string;       // user id
    jti: string;       // unique token id (for rotation)
    type: 'refresh';
}

// ─── JWT helpers ─────────────────────────────────────────────────────────────

export function signAccessToken(payload: Omit<AccessTokenPayload, 'type'>): string {
    return jwt.sign(
        { ...payload, type: 'access' },
        getJwtSecret(),
        { algorithm: 'HS256', expiresIn: ACCESS_EXPIRES } as jwt.SignOptions
    );
}

export function signRefreshToken(userId: string, jti: string): string {
    return jwt.sign(
        { sub: userId, jti, type: 'refresh' },
        getJwtSecret(),
        { algorithm: 'HS256', expiresIn: REFRESH_EXPIRES } as jwt.SignOptions
    );
}

export function verifyAccessToken(token: string): AccessTokenPayload {
    const decoded = jwt.verify(token, getJwtSecret(), { algorithms: ['HS256'] }) as AccessTokenPayload;
    if (decoded.type !== 'access') throw new Error('Invalid token type');
    return decoded;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
    const decoded = jwt.verify(token, getJwtSecret(), { algorithms: ['HS256'] }) as RefreshTokenPayload;
    if (decoded.type !== 'refresh') throw new Error('Invalid token type');
    return decoded;
}

export function decodeTokenUnsafe(token: string): AccessTokenPayload | null {
    try {
        return jwt.decode(token) as AccessTokenPayload;
    } catch {
        return null;
    }
}

// ─── Token ID generation (for refresh token rotation) ────────────────────────

export function generateJti(): string {
    return createHash('sha256')
        .update(`${Date.now()}-${Math.random()}`)
        .digest('hex')
        .slice(0, 32);
}

// ─── Hash refresh token for DB storage (don't store raw token) ───────────────

export function hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
}

// ─── Password helpers ────────────────────────────────────────────────────────

const BCRYPT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

export { ACCESS_COOKIE, REFRESH_COOKIE, accessCookieOptions, refreshCookieOptions, clearCookieOptions };
