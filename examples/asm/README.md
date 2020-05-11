# ASM

code example and exercise for book named "x86 汇编语言：从实模式到保护模式", ISBN 978-7-121-18799-5

## Usage

```bash
nasm -f bin 1.asm -o 1.bin
```

```bash
# running 1.img using qemu-system-x86_64
qemu-system-x86_64 ./1.bin
```
