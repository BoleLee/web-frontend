<script>
let books = []

async function getData() {
  const response = await fetch('http://localhost:3000/book/all');
  let result = await response.json();
  console.log(result)
  books = result.data
}

getData()
</script>

<ul class="list">
  {#each books as book (book.id)}
  <li key="{book.id}" class="list-item">
    <div>{book.id}</div>
    <div>{book.name}</div>
    <div>{book.author}</div>
    <div>{book.publish}</div>
  </li>
  {/each}
</ul>


<style>
.list {
  list-style: none;
  margin: 0;
  padding: 20px 15px;
  border: 1px solid #dfdfdf;
}
.list-item {
  border-bottom: 1px solid #dfdfdf;
  display: flex;
  justify-content: space-around;
  min-height: 50px;
  line-height: 50px;
}
</style>