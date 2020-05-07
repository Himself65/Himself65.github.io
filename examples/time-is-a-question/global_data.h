#include <cstdint>

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
