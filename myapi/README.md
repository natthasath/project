## Install Dotnet Tool Entity Framework
- dotnet tool install --global dotnet-ef --version 3.0.0

## Install NUGET Package in myapi.csproj
- <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="3.0.1" />
- <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="3.0.1">
    <PrivateAssets>all</PrivateAssets>
    <IncludeAssets>runtime; build; native; contentfiles; analyzers</IncludeAssets>
  </PackageReference>
- run "dotnet restore" in terminal
- [NUGET Package](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.SqlServer/)

## Entity Framework
dotnet ef dbcontext scaffold "Server=localhost,1112;user id=sa; password=Tel1234!; Database=CMPOS;" Microsoft.EntityFrameworkCore.SqlServer -o Models -t products -t users -c DatabaseContext --context-dir Database

## Certificate
- dotnet dev-cert https --trust

## Data Annotation
- []

wildermind
c# extension
refresh token access token => oauth

## What's new
https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-3.0