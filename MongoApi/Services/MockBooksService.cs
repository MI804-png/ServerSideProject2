using MongoApi.Models;

namespace MongoApi.Services;

public class MockBooksService
{
    private static List<Book> _books = new List<Book>();
    private static long _nextId = 1;

    public async Task<List<Book>> GetAsync()
    {
        await Task.Delay(10); // Simulate async operation
        return _books;
    }

    public async Task<Book?> GetAsync(string id)
    {
        await Task.Delay(10); // Simulate async operation
        return _books.FirstOrDefault(x => x.Id == id);
    }

    public async Task CreateAsync(Book newBook)
    {
        await Task.Delay(10); // Simulate async operation
        newBook.Id = _nextId.ToString();
        _nextId++;
        _books.Add(newBook);
    }

    public async Task UpdateAsync(string id, Book updatedBook)
    {
        await Task.Delay(10); // Simulate async operation
        var index = _books.FindIndex(x => x.Id == id);
        if (index != -1)
        {
            updatedBook.Id = id;
            _books[index] = updatedBook;
        }
    }

    public async Task RemoveAsync(string id)
    {
        await Task.Delay(10); // Simulate async operation
        var book = _books.FirstOrDefault(x => x.Id == id);
        if (book != null)
        {
            _books.Remove(book);
        }
    }
}
