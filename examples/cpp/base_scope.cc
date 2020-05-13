#include <iostream>

class Scope
{
public:
    Scope()
    {
        std::cout << "in" << std::endl;
    }
    ~Scope()
    {
        std::cout << "out" << std::endl;
    }
};

void solve()
{
    auto scope = Scope();
    std::cout << "in the scope" << std::endl;
}

int main()
{
    solve();
    return 0;
}