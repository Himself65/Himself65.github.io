#lang racket
(define (count-number-length x)
  (if (equal? x 0)
      0
      (+ 1 (count-number-length (floor (/ x 10))))))

(define (reverse-number x) (reverse-number-iter x (expt 10 (count-number-length (floor (/ x 10))))))

(define (reverse-number-iter x base)
  (if (equal? x 0)
      0
      (+ (* (modulo x 10) base) (reverse-number-iter (floor (/ x 10)) (/ base 10)))))

(define (reverse-number? x) (equal? x (reverse-number x)))

(reverse-number? 1)
(reverse-number? 100)
(reverse-number? 10086)
(reverse-number? 114514)
(reverse-number? 101)