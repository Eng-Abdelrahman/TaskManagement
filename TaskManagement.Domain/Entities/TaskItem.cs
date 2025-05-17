namespace TaskManagement.Domain.Entities;

public class TaskItem
{
    public long Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public Int64 AssignedUserId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool IsCompleted { get; set; }

}
