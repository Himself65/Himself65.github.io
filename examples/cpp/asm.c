// gcc -Og -o asm.out asm.c
// gcc -Og -S asm.c
#include <stdio.h>
#define M 100
#define N 100
long P[M][N];
long Q[N][M];
long sum_element(long i, long j)
{
    return P[i][j] + Q[j][i];
}
/*
sum_element:
	leaq	(%rdi,%rdi,4), %rax
	leaq	(%rax,%rax,4), %rax
	leaq	(%rsi,%rax,4), %rcx
	leaq	(%rsi,%rsi,4), %rax
	leaq	(%rax,%rax,4), %rax
	leaq	(%rdi,%rax,4), %rdx
	leaq	Q(%rip), %rax
	movq	(%rax,%rdx,8), %rax
	leaq	P(%rip), %rdx
	addq	(%rdx,%rcx,8), %rax
	ret
*/

int main()
{
    return 0;
}