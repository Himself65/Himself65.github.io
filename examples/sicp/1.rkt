#lang racket
(define (next-val current-val)
  (define len (length current-val))
  current-val (append current-val (list (+ (list-ref current-val (- len 1))
                                           (* 2 (list-ref current-val (- len 2)))
                                           (* 3 (list-ref current-val (- len 3)))))))

(define (f n)
  (if (< n 3)
      n
      (first (for/fold ([val '((0 1 2))])
                    ([_ (in-range 3 n)])
                    (cons (next-val (first val)) val)))))

(define (pascal n)
  (define (next-row current-row)
    (map + (cons 0 current-row)
           (append current-row '(0))))
  (reverse
   (for/fold ([triangle '((1))])
             ([row (in-range 1 n)])
     (cons (next-row (first triangle)) triangle))))