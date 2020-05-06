#include <iostream>
#include <string>
#include <thread>

class GlobalData
{
public:
    static GlobalData &instance()
    {
        static GlobalData *_globalData = new GlobalData();
        return *_globalData;
    }

    int32_t get_value() const
    {
        return value;
    }

    void set_value(int32_t val)
    {
        value = val;
    }

private:
    GlobalData() : value(0) {}

    int32_t value;
};

void plus_value(int times, const std::string &&name)
{
    using namespace std;
    auto &globalData = GlobalData::instance();
    for (int i = 0; i < times; ++i)
    {
        int32_t previous = globalData.get_value();
        globalData.set_value(previous + 1);
        this_thread::sleep_for(100ms);
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
}

int main()
{
    using std::thread;
    thread th1(plus_value, 1000, std::string("1 thread"));
    thread th2(plus_value, 1000, std::string("2 thread"));
    th1.detach();
    th2.detach();
    return 0;
}