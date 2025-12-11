# Node JS courses API

These are the available APIs:

## Get-Courses

```
    Method: GET
    URL: http://localhost:8080/api/courses
```

## Get-Specific-Course

```
    Method: GET
    URL: http://localhost:8080/api/courses/:courseId
```

## Create-Course

```
    Method: POST
    URL: http://localhost:8080/api/courses/
    Body:
        {
            "title": "Angular course",
            "price": 2500
        }
```

## Edit-Course

```
    Method: PATCH
    URL: http://localhost:8080/api/courses/:courseId
    Body:
        {
            "title": "new Name course"
        }
```

## Delete-Course

```
    Method: DELETE
    URL: http://localhost:8080/api/courses/:courseId
```
