# Fix Admin Authentication and Security Configuration

This plan addresses the `400 Bad Request` (HTML) occurring during admin login and ensures robust authentication using email fields. It also updates security configurations to include the new production subdomains.

## User Review Required

> [!NOTE]
> The `400 Bad Request` with `text/html` response content strongly suggests a Django `DisallowedHost` error. This happens when the `ALLOWED_HOSTS` setting does not include the hostname being requested (`api.hardvendor.store`).

- **Authentication Endpoint**: I am switching the admin login from the default `dj_rest_auth` login to a custom `/auth/token/` endpoint. This custom endpoint is explicitly designed to handle email-based authentication and provides better compatibility for the current frontend payload.
- **SSL Warning**: The "Not Secure" warning is likely due to the browser not trusting the certificate or mixed content. If it's a new subdomain, it might just be propagation delay. I've audited the code for insecure assets and found none, but I'll ensure all backend-injected links use HTTPS.

## Proposed Changes

### Backend Configuration

#### [settings.py](file:///C:/Users/PC/Desktop/tinahstore.me/backend/hardvendor/settings.py)

- Add `api.hardvendor.store` and `hardvendor.store` to the default `ALLOWED_HOSTS` list.
- Add `https://admin.hardvendor.store` to `CSRF_TRUSTED_ORIGINS`.

```diff
 ALLOWED_HOSTS = env.list(
     'ALLOWED_HOSTS',
-    default=['localhost', '127.0.0.1']
+    default=['localhost', '127.0.0.1', 'api.hardvendor.store', 'hardvendor.store']
 )

 # settings.py

 CSRF_TRUSTED_ORIGINS = [
     "https://api.hardvendor.store",
     "https://hardvendor.store",  # Good practice to include your frontend too
+    "https://admin.hardvendor.store",
 ]
```

---

### Backend Authentication

#### [auth.py](file:///C:/Users/PC/Desktop/tinahstore.me/backend/core/auth.py)

- Change invalid credentials response from `400` to `401` to distinguish from client errors.

```diff
         if not user:
-            return Response({'error': 'Invalid credentials'}, status=400)
+            return Response({'error': 'Invalid credentials'}, status=401)
```

---

### Admin Panel Service

#### [auth.js](file:///C:/Users/PC/Desktop/tinahstore.me/admin-panel/src/services/auth.js)

- Shift `login` endpoint from `/auth/login/` to `/auth/token/`.

```diff
 export const authService = {
   login: async (email, password) => {
-    const response = await api.post('/auth/login/', { email, password });
+    const response = await api.post('/auth/token/', { email, password });
     return response.data;
   },
```

## Verification Plan

### Automated Tests
- I will verify the changes by inspecting the code and ensuring all references to the login endpoint are updated.
- I will run a syntax check on the modified files.

### Manual Verification
- **Login Flow**: Test the login flow on the admin panel. Ensure that if valid credentials are provided, a token is returned and stored.
- **Error Handling**: Verify that invalid credentials return a `401 Unauthorized` with a JSON error message instead of an HTML 400.
- **Host Validation**: Verify that the backend no longer returns `DisallowedHost` errors for `api.hardvendor.store`.
- **SSL Audit**: Check the browser console for any mixed content warnings after the deployment of these changes.
