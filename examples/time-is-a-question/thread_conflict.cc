#include "header.h"
#include "global_data.h"

void plus_value(int times, const std::string &&name)
{
    using namespace std;
    cout << "start thraed:" << name << endl;
    auto start = chrono::steady_clock::now();
    auto &globalData = GlobalData::instance();
    for (int i = 0; i < times; ++i)
    {
        int32_t previous = globalData.get_value();
        globalData.set_value(previous + 1);
        int32_t after = globalData.get_value();
        if ((previous + 1) != after)
        {
            cout << name << endl;
            cout << "previous value + 1 not equal to the after value" << endl
                 << "previous: " << previous << " " << endl
                 << "after: " << after << " " << endl;
            exit(1);
        }
    }
    auto end = std::chrono::steady_clock::now();
    chrono::duration<double> elapsed_seconds = chrono::duration<double>(end - start);
    cout << "cost time: " << elapsed_seconds.count() << "s" << endl;
}

int main()
{
    using std::thread;
    thread th1(plus_value, 1000, std::string("1 thread"));
    thread th2(plus_value, 1000, std::string("2 thread"));
    th1.join();
    th2.join();
    return 0;
}