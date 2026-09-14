# Task Management

- [x] Investigate 400 Bad Request and SSL warning
- [x] Fix Admin Authentication and Security Configuration
    - [x] Update `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS` in `settings.py`
    - [x] Change `EmailAuthToken` error code to 401
    - [x] Update `authService.login` to use `/auth/token/`
- [x] Verify fixes
- [x] Fix 500 Error on /settings/ Endpoint
    - [x] Update `get_system_settings` view in `views_admin.py`
    - [x] Verify fix
