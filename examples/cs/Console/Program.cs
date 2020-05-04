using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Console
{
    class Program
    {
        static async Task<string> GetServer(string host, Int32 port)
        {
            HttpClient client = new HttpClient();
            client.Timeout = TimeSpan.FromSeconds(1);
            Task<string> task = client.GetStringAsync($"{host}:{port}");
            return await task;
        }

        static int Main(string[] args)
        {
            if (args.Length < 2)
            {
                System.Console.Error.WriteLine("args.Length must >= 2, expected: {0}", args.Length);
                return 1;
            }

            string host = args[0];
            Int32 port = Int32.Parse(args[1]);
            string res = GetServer(host, port).GetAwaiter().GetResult();
            System.Console.WriteLine(res);
            return 0;
        }
    }
}
