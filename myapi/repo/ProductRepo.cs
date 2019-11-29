using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using myapi.Database;
using myapi.Models;

namespace myapi.repo
{
    public class ProductRepo : IProductRepo
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ProductRepo(DatabaseContext context, IHttpContextAccessor httpContextAccessor, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            this._httpContextAccessor = httpContextAccessor;
            this._webHostEnvironment = webHostEnvironment;
        }

        public DatabaseContext _context { get; }

        public async Task<Products> AddProduct(Products product)
        {
            var image = await UploadProductImages();
            if (!String.IsNullOrEmpty(image))
            {
                product.Image = image;
            }

            _context.Products.Add(product);
            _context.SaveChanges();

            return product;
        }

        public bool DeleteProduct(int id)
        {
            var result = GetProduct(id);
            if (result == null)
            {
                return false;
            }

            _context.Products.Remove(result);
            _context.SaveChanges();
            return true;
        }

        public async Task<Products> EditProduct(Products product, int id)
        {
            var result = GetProduct(id);
            if (result != null)
            {
                var image = await UploadProductImages();
                if (!String.IsNullOrEmpty(image))
                {
                    result.Image = image;
                }

                result.Name = product.Name;
                result.Price = product.Price;
                result.Stock = product.Stock;

                _context.Products.Update(result);
                _context.SaveChanges();
            }

            return result;
        }

        public IEnumerable<Products> GetProduct()
        {
            // throw new System.NotImplementedException();
            return _context.Products.ToList();
        }

        public Products GetProduct(int id)
        {
            return _context.Products.SingleOrDefault(p => p.ProductId == id);
        }

        // Note: recommended used async Task
        public async Task<String> UploadProductImages()
        {
            var files = _httpContextAccessor.HttpContext.Request.Form.Files;

            if (files.Count > 0)
            {
                const string folder = "/images/";
                string filePath = _webHostEnvironment.WebRootPath + folder;

                string fileName = "";
                //var fileNameArray = new List<String>(); // multiple images case

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                // S3 uuid -> uuid + Token to Azure
                foreach (var formFile in files)
                {
                    fileName = Guid.NewGuid().ToString() + System.IO.Path.GetExtension(formFile.FileName); // unique name
                    string fullPath = filePath + fileName;

                    if (formFile.Length > 0)
                    {
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            await formFile.CopyToAsync(stream);
                        }
                    }

                    // fileNameArray.Add(fileName); // multiple images case
                }

                return fileName;
                //return fileNameArray; // multiple images case
            }
            return String.Empty;
            //return null;      // multiple images case
        }
    }
}