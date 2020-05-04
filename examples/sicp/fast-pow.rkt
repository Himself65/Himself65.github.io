#lang sicp
(define (pow a b)
  (define (f a b result)
    (cond
      [(equal? b 1) (* result a)]
      [(equal? (modulo b 2) 1) (f a (- b 1) (* result a))]
      [(f (* a a) (/ b 2) result)]))
  (f a b 1))

(equal? (pow 2 2) 4)
(equal? (pow 2 5) 32)
(equal? (pow 10 1) 10)
