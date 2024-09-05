    <%@ include file="common/header.jspf" %>
    <%@ include file="common/navigation.jspf" %>

    <div class="container">
    <h2>Your todos are ${todo}</h2>
    <table class="table">
        <thead>
            <tr>
            <th>Description</th>
            <th>Target Date</th>
            <th>Done</th>
            <th></th>
            <th></th>
            </tr>
        </thead>
        <tbody>
        <c:forEach items="${todos}" var ="todo">
            <tr>

                <td>${todo.description}</td>
                <td>${todo.targetDate}</td>
                <td>${todo.done}</td>
                <td><a href="update-todo?id=${todo.id}" class="btn btn-success"/a>UPDATE</td>
                <td><a href="delete-todo?id=${todo.id}" class="btn btn-warning">DELETE</a></td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
    <a href="add-todos" class="btn btn-success">Add Todo</a>
    </div>
    <%@ include file="common/footer.jspf" %>
