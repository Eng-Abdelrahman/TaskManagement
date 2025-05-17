using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagement.Application.Models;
using TaskManagement.Domain.Entities;

namespace TaskManagement.Application
{
    public static class MappingConfig
    {
        public static void RegisterMappings()
        {
            TypeAdapterConfig<TaskDto, TaskItem>
                .NewConfig()
                .IgnoreNullValues(true)
                .TwoWays();

      
        }
    }
}
