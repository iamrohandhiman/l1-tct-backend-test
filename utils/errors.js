export class ValidationError extends Error {
  constructor(message = "Invalid input") {
    super(message); 
    this.name = "ValidationError"; 
    this.statusCode = 400; 
  }
}

export class AuthenticationError extends Error {
  constructor(message = "Authentication failed") {
    super(message);
    this.name = "AuthenticationError"; 
    this.statusCode = 401; 
  }
}

export class AuthorizationError extends Error {
  constructor(message = "You are not authorized to perform this action") {
    super(message);
    this.name = "AuthorizationError"; 
    this.statusCode = 403; 
  }
}

export class NotFoundError extends Error {
  constructor(message = "The requested resource was not found") {
    super(message);
    this.name = "NotFoundError"; 
    this.statusCode = 404; 
  }
}

export class ConflictError extends Error {
  constructor(message = "Conflict occurred") {
    super(message);
    this.name = "ConflictError"; 
    this.statusCode = 409; 
  }
}

export class DatabaseError extends Error {
  constructor(message = "A database error occurred") {
    super(message);
    this.name = "DatabaseError"; 
    this.statusCode = 500; 
  }
}

export class ServiceUnavailableError extends Error {
  constructor(message = "The service is temporarily unavailable. Please try again later.") {
    super(message);
    this.name = "ServiceUnavailableError"; 
    this.statusCode = 503; 
  }
}
