#lang racket
(define (f_0 n)
  (if (< n 3)
      n
      (+ (f_0 (- n 1))
         (* 2 (f_0 (- n 2)))
         (* 3 (f_0 (- n 3))))))

(define (f_1 n)
    (f-iter 2 1 0 0 n))

(define (f-iter a b c i n)
    (if (= i n)
        c
        (f-iter (+ a (* 2 b) (* 3 c))   
                a                      
                b                       
                (+ i 1)
                n)))

(f_0 4)
(f_1 4)
;(equal? (f_0 10) (f_1 10))