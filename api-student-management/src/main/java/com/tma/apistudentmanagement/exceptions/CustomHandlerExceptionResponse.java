package com.tma.apistudentmanagement.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.persistence.EntityNotFoundException;

@RestControllerAdvice
public class CustomHandlerExceptionResponse extends ResponseEntityExceptionHandler {
    private static Logger log = LoggerFactory.getLogger(CustomHandlerExceptionResponse.class);
    //bad-request missing param
    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(MissingServletRequestParameterException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        return new ResponseEntity<>(new ExceptionResponseDetail(HttpStatus.BAD_REQUEST, "Thông tin request không hợp lệ! Error: " + ex.getMessage()), status);
    }

    //bad-request handler exception internal
    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers, HttpStatus status, WebRequest request) {
        log.info("CustomHandlerExceptionResponse - ResponseEntityExceptionHandler - handlerExceptionInternal");
        return new ResponseEntity<>(new ExceptionResponseDetail(HttpStatus.BAD_REQUEST, "Thông tin request không hợp lệ!"), status);
    }

    //method not allow (script: none data put)
    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        log.info("CustomHandlerExceptionResponse - ResponseEntityExceptionHandler - handlerMethodNotAllow");
        return new ResponseEntity<>(new ExceptionResponseDetail(HttpStatus.METHOD_NOT_ALLOWED, "Thông tin request không hợp lệ. Thiếu dữ liệu put-param."), status);
    }

    //InvalidDefinitionException
    @Override
    protected ResponseEntity<Object> handleBindException(BindException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        return super.handleBindException(ex, headers, status, request);
    }

    // my custom bad-request
    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ExceptionResponseDetail handlerBadRequestException(BadRequestException ex, WebRequest req) {
        return new ExceptionResponseDetail(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(InternalServerException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ExceptionResponseDetail handlerInternalServerException(InternalServerException ex, WebRequest req) {
        return new ExceptionResponseDetail(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }

    @ExceptionHandler({
            NotFoundException.class,
            EntityNotFoundException.class
    })
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionResponseDetail handlerNotFoundException(NotFoundException ex, WebRequest req) {
        return new ExceptionResponseDetail(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler({
            MyBadCredentialsException.class
    })
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ExceptionResponseDetail handlerBadCredentialsException(MyBadCredentialsException ex, WebRequest req) {
        return new ExceptionResponseDetail(HttpStatus.UNAUTHORIZED, ex.getMessage());
    }

}
