# Project Mandates: Supabase & Appointment System

## Supabase Connection
- **Environment Variables**: Use `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- **Hardcoding**: NEVER hardcode credentials inside components.
- **Client Location**: Create and use the Supabase client in `src/lib/supabase.ts`.
- **Usage**: Access variables via `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_ANON_KEY`.
- **Persistence**: Use official Supabase client with normal browser session persistence.
- **Session Management**: Do not manually clear or remove the Supabase session. Do not sign the admin out automatically unless the user clicks a sign out button.

## Database Schema
Use this exact schema. Do not rename fields or invent new ones.

### services
- `id`
- `name`
- `description`
- `duration_minutes`
- `price`
- `is_active`
- `created_at`

### appointments
- `id`
- `full_name`
- `email`
- `phone`
- `service_id`
- `appointment_date`
- `start_time`
- `end_time`
- `status`
- `notes`
- `created_at`

### business_hours
- `id`
- `weekday`
- `is_open`
- `start_time`
- `end_time`

### blocked_dates
- `id`
- `blocked_date`
- `reason`
- `created_at`

### business_settings
- `id`
- `business_name`
- `business_email`
- `business_phone`
- `business_address`
- `slot_interval_minutes`
- `booking_notice_hours`
- `created_at`

### admin_users
- `id`
- `user_id`
- `created_at`

## Implementation Rules
- **Always use `business_settings`**.
- **NEVER** use `travel_settings`, `taxi_settings`, or `cab_settings`.
- **NEVER** rename tables or fields.
- **Admin Access**: Base only on `admin_users.user_id = auth.uid()`.
- **Authentication**: Do not use fake authentication.
