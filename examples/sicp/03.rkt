#lang racket

(define balance 100)

(define (withdraw amount)
  (if (>= balance amount)
      (begin (set! balance (- balance amount))
             balance)
      "Insufficient funds"))
; https://docs.racket-lang.org/reference/begin.html

; use the state
(define (new-withdraw origin)
  (let ((balance origin))
    (lambda (amount)
      (if (>= balance amount)
          (begin (set! balance (- balance amount))
                 balance)
          "Insufficient funds"))))

(define W1 (new-withdraw 100))

;(W1 0)

;(W1 110)

;(W1 10)

;(W1 10)

; # 3.1

(define (make-accumulator inival-value)
  (let ((sum inival-value))
    (lambda (value)
      (begin (set! sum (+ sum value)) sum))))

;(define A (make-accumulator 5))

;(A 10)

;(A 10)

(define (make-monitored fn)
  (let ((called-times 0))
    (lambda (input)
      (if (equal? input 'how-many-calls?)
          called-times
          (begin (set! called-times (+ called-times 1)) (fn input))))))

(define s (make-monitored sqrt))

(s 100)
;> 10
(s 9)
;> 3
(s 'how-many-calls?)
;> 2
