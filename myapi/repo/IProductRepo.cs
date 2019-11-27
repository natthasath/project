using System.Collections.Generic;
using myapi.Models;

namespace myapi.repo
{
    public interface IProductRepo
    {
        IEnumerable<Products> GetProduct();
    }
}