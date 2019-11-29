using System.Collections.Generic;
using System.Threading.Tasks;
using myapi.Models;

namespace myapi.repo
{
    public interface IProductRepo
    {
        IEnumerable<Products> GetProduct();
        Products GetProduct(int id);
        Task<Products> AddProduct(Products product);
        Task<Products> EditProduct(Products product, int id);
        bool DeleteProduct(int id);
    }
}