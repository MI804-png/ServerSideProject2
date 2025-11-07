using MongoApi.Models;
using MongoApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace MongoApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly MockBooksService _mockBooksService;

    public BooksController()
    {
        _mockBooksService = new MockBooksService();
    }

    [HttpGet]
    public async Task<List<Book>> Get()
    {
        return await _mockBooksService.GetAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> Get(string id)
    {
        var book = await _mockBooksService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        return book;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Book newBook)
    {
        await _mockBooksService.CreateAsync(newBook);
        return CreatedAtAction(nameof(Get), new { id = newBook.Id }, newBook);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, Book updatedBook)
    {
        var book = await _mockBooksService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        updatedBook.Id = book.Id;
        await _mockBooksService.UpdateAsync(id, updatedBook);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var book = await _mockBooksService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        await _mockBooksService.RemoveAsync(id);
        return NoContent();
    }
}
