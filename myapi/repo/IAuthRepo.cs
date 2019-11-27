using myapi.Models;

namespace myapi.repo
{
    public interface IAuthRepo
    {
        (Users, string) Login(Users user);

        void Register(Users user);
    }
}