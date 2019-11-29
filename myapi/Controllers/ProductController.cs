using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using myapi.Database;
using myapi.Models;
using myapi.repo;

namespace mypos_api.Controllers
{

    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class ProductController : ControllerBase
    {

        ILogger<ProductController> _logger;
        public ProductController(ILogger<ProductController> logger, IProductRepo productRepo)
        {
            _logger = logger;
            _productRepo = productRepo;
        }

        public IProductRepo _productRepo { get; }

        [HttpGet]
        public IActionResult GetAllProduct()
        {
            try
            {
                // return Ok(_productRepo.GetProduct());
                return Ok(new { result = _productRepo.GetProduct(), message = "request successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to execute GET" + ex);
                return StatusCode(500, new { result = ex, message = ex });
            }
        }

        [HttpGet("{id}")] // localhost../product/{id}
        public IActionResult GetProduct(int id)
        {
            try
            {
                var result = _productRepo.GetProduct(id);

                if (result == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(new { result = result, message = "request successfully" });
                }
            }
            catch (Exception error)
            {
                _logger.LogError($"Log GetProduct: {error}");
                return StatusCode(500, new { result = "", message = error });
            }
        }

        [HttpPost]
        public async Task<IActionResult> NewProduct([FromForm] Products data)
        {
            try
            {
                var result = await _productRepo.AddProduct(data);
                return Ok(new { result = result, message = "create product successfully" });
            }
            catch (Exception error)
            {
                _logger.LogError($"Log CreateProduct: {error}");
                return StatusCode(500, new { result = "", message = error });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProduct([FromForm] Products data, int id)
        {
            try
            {
                var result = await _productRepo.EditProduct(data, id);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(new { result = result, message = "update product successfully" });
            }
            catch (Exception error)
            {
                _logger.LogError($"Log UpdateProduct: {error}");
                return StatusCode(500, new { result = "", message = error });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                var result = _productRepo.DeleteProduct(id);
                if (result == false)
                {
                    return NotFound();
                }
                return Ok(new { result = "", message = "delete product sucessfully" });
            }
            catch (Exception error)
            {
                _logger.LogError($"Log DeleteProduct: {error}");
                return StatusCode(500, new { result = "", message = error });
            }
        }

        [AllowAnonymous]
        [HttpGet("images/{name}")]  // localhost.../product/images/xxx
        public IActionResult GetProductImage(String name)
        {
            try
            {
                return File($"~/images/{name}", "image/jpg");
                // return File($"~/images/{name}", "image/jpg", "xxx.jpg");
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("search")] // localhost.../product/search?name=xxxx&order=asc
        public IActionResult Search([FromQuery] string name, [FromQuery] string order)
        {
            try
            {
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}