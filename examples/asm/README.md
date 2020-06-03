# ASM

code example and exercise for book named "x86 汇编语言：从实模式到保护模式", ISBN 978-7-121-18799-5

## Requirement

- [NASM](https://www.nasm.us/)

- [QEMU](https://www.qemu.org/)

- [GDB](http://www.gnu.org/software/gdb)

## Usage

```bash
nasm -f bin 1.asm -o 1.bin
```

```bash
# running 1.img using qemu-system-x86_64
# '-m' is short for memory size
qemu-system-x86_64 ./1.bin -m 512
# same as
qemu-system-x86_64 --drive file=1.bin,index=0,media=disk,format=raw -m 512
```

## Debug using `GDB`

Firstly, you need start you qemu with hanging, `-S` meaning to 'freeze CPU at start up'

```bash
qemu-system-x86_64 -s -S -hda ./1.bin -nographic
```

Now, turn on the GDB

```powershell
PS C:\Users\Himself65> gdb
(gdb) target remote localhost:1234
Remote debugging using localhost:1234
warning: No executable has been specified and target does not support
determining executable automatically.  Try using the "file" command.
0x000000000000fff0 in ?? ()
(gdb) i r
rax            0x0                 0
rbx            0x0                 0
rcx            0x0                 0
rdx            0x663               1635
rsi            0x0                 0
rdi            0x0                 0
rbp            0x0                 0x0
rsp            0x0                 0x0
r8             0x0                 0
r9             0x0                 0
r10            0x0                 0
r11            0x0                 0
r12            0x0                 0
r13            0x0                 0
r14            0x0                 0
r15            0x0                 0
rip            0xfff0              0xfff0
eflags         0x2                 [ IOPL=0 ]
cs             0xf000              61440
ss             0x0                 0
ds             0x0                 0
es             0x0                 0
fs             0x0                 0
gs             0x0                 0
fs_base        0x0                 0
gs_base        0x0                 0
k_gs_base      0x0                 0
cr0            0x60000010          [ CD NW ET ]
--Type <RET> for more, q to quit, c to continue without paging--
(gdb)
```
