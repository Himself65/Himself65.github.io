bits 16     ; 16位编译
org 0x7c00  ; 从0x7c00是起始地址
boot:
    mov si, hello   ; hello的地址传给si寄存器（Source Index Register）
    mov ah, 0x0e    ;
.loop:
    lodsb           ;
    or al, al       ;
    jz halt         ;
    int 0x10        ;
    jmp .loop       ;
halt:
    cli             ;
    hlt             ;
hello: db "Hello, world!", 0

times 510 - ($ - $$) db 0
dw 0xAA55   ; Magic Number
