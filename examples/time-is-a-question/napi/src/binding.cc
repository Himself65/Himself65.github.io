#define NODE_ADDON_API_DISABLE_DEPRECATED
#define NAPI_DISABLE_CPP_EXCEPTIONS
#include <napi.h>

static Napi::Value TestDeadlock(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    Napi::Value async_name = Napi::String::New(env, "N-API Thread-safe Function Deadlock Test");
    Napi::ThreadSafeFunction tsfn = Napi::ThreadSafeFunction::New(env, info[0].As<Napi::Function>(), async_name, 1, 1);
    tsfn.BlockingCall();
    napi_status status = tsfn.BlockingCall();
    tsfn.Release();
    Napi::Value return_value;
    if (status == napi_would_deadlock) {
        return_value = Napi::String::New(env, "Would deadlock");
    } else {
        return_value = Napi::String::New(env, "Not deadlock");
    }
    return return_value;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports["testDeadLock"] = Napi::Function::New(env, TestDeadlock);
  return exports;
}

NODE_API_MODULE(addon, Init)