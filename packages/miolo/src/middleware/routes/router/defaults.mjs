const DEFAULT_AUTH_USER = {
  require: false,     // true / false / 'read-only'
  action: 'redirect', // 'error'
  redirect_url: '/',
  error_code: 401
}

const DEFAULT_USE_USER_FIELDS = {
  use: false,
  fieldNames: {
    created_by: 'created_by', 
    last_update_by: 'last_update_by'
  }
}

export {
  DEFAULT_AUTH_USER,
  DEFAULT_USE_USER_FIELDS
}