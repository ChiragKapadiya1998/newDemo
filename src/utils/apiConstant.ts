export const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzkzMzU4Njk4LCJpYXQiOjE3OTA3NjY2OTgsImp0aSI6ImMwOTQ4NDcwMDBlNzQ2NDZiMDY2NmU4NzA1YTFkN2NkIiwidXNlcl9pZCI6IjkzOWNjODIxLWYzZDktNDhhNy1hMGVmLWQ1ZmI1MmY2ZmY5NSJ9.4ffSFTTBqR97HWClmkL8MJSLrLDyY8wROlyJ7JbB__M';

export const API = {
  BASE_URL: 'https://api.hey.watch/api/v1',
  STREAM_BASE: 'http://103.38.50.248:8005/api/v1',

  getDashboard: '/customers/me/dashboard',
  explore: '/storage/explore/',
  folderId: 'bfce46dc-5b98-4a57-8bda-283ef811682b',
};

export const streamUrl = (fileId: string) => {
  return `${API.STREAM_BASE}/storage/stream/${fileId}/?token=${ACCESS_TOKEN}`;
};

export const POST = 'POST';
export const GET = 'GET';
export const PATCH = 'PATCH';
export const DELETE = 'DELETE';

export const API_ERROR_CODE = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

export const API_TIMEOUT = {
  DEFAULT: 30000,
  UPLOAD: 120000,
  LONG_OPERATION: 60000,
} as const;

export const API_CACHE = {
  NO_CACHE: 'no-cache',
  SHORT: 60,
  MEDIUM: 300,
  LONG: 3600,
  VERY_LONG: 86400,
} as const;

export const API_RATE_LIMIT = {
  MAX_REQUESTS_PER_MINUTE: 60,
  RETRY_AFTER: 1000,
  MAX_RETRIES: 3,
} as const;

export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
