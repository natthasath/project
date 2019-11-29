using AutoMapper;
using myapi.Models;

namespace myapi.Util
{
    public class AutoMaapper : Profile
    {
        public AutoMaapper()
        {
            // Name ViewModel = Name Model (Case Sensitive)
            CreateMap<UsersViewModel, Users>();
        }
    }
}