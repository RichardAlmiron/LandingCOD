-- ============================================================
-- LandingCOD — Supabase PostgreSQL Schema
-- Migration: English to Spanish Table Names
-- Run this in Supabase → SQL Editor instead of dropping tables
-- ============================================================

-- 1. Rename Tables
ALTER TABLE IF EXISTS users RENAME TO usuarios;
ALTER TABLE IF EXISTS sessions RENAME TO sesiones_auth;
ALTER TABLE IF EXISTS projects RENAME TO proyectos;

-- 2. Rename Indexes
ALTER INDEX IF EXISTS idx_users_email RENAME TO idx_usuarios_email;
ALTER INDEX IF EXISTS idx_users_role RENAME TO idx_usuarios_role;
ALTER INDEX IF EXISTS idx_sessions_user_id RENAME TO idx_sesiones_auth_user_id;
ALTER INDEX IF EXISTS idx_sessions_token_hash RENAME TO idx_sesiones_auth_token_hash;
ALTER INDEX IF EXISTS idx_sessions_expires_at RENAME TO idx_sesiones_auth_expires_at;
ALTER INDEX IF EXISTS idx_projects_user_id RENAME TO idx_proyectos_user_id;
ALTER INDEX IF EXISTS idx_projects_status RENAME TO idx_proyectos_status;

-- 3. Rename Triggers
ALTER TRIGGER IF EXISTS users_updated_at ON usuarios RENAME TO usuarios_updated_at;
ALTER TRIGGER IF EXISTS projects_updated_at ON proyectos RENAME TO proyectos_updated_at;
