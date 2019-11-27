using System.Collections.Generic;
using System.Linq;
using myapi.Database;
using myapi.Models;

namespace myapi.repo
{
    public class ProductRepo : IProductRepo
    {
        public ProductRepo(DatabaseContext context)
        {
            _context = context;
        }

        public DatabaseContext _context { get; }

        public IEnumerable<Products> GetProduct()
        {
            // throw new System.NotImplementedException();
            return _context.Products.ToList();
        }
    }
}