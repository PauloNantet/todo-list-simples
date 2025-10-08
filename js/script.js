// Seletores
const inputTask = document.querySelector(".input-task"); // Input de tarefa
const addBtn = document.querySelector(".add-task"); // Botão de adicionar
const ul = document.querySelector(".task-list"); // Lista de tarefas (ul)


// Tarefas iniciais
let taskList = [
  //   { task: "666666", checked: false },
  //   { task: "888888", checked: false },
  //   { task: "999999", checked: false },
];

CreateTask(); // Renderiza as tarefas iniciais (se houver)

// Função para adicionar tarefa
function addTask() {
  const value = inputTask.value.trim(); // Remove espaços em branco
  if (value) {
    taskList.push({ task: value, checked: false }); // Adiciona nova tarefa
    inputTask.value = ""; // Limpa o input
    CreateTask(); // Re-renderiza a lista
  }

  inputTask.focus(); // Mantém o foco no input
}

// Função para renderizar as tarefas
function CreateTask() {
  ul.innerHTML = ""; // Limpa a lista antes de renderizar

  if (taskList.length === 0) {
    const noTaskDiv = document.createElement("div"); // Mensagem quando não há tarefas
    noTaskDiv.classList.add("no-task"); // Adiciona uma classe para estilização
    noTaskDiv.textContent = "Não há tarefas para concluir..."; // Texto da mensagem
    ul.appendChild(noTaskDiv); // Adiciona a mensagem à lista

    return; // Sai da função
  }

  taskList.forEach((item, index) => {
    const li = document.createElement("li"); // Cria o item da lista
    li.classList.add("task"); // Adiciona uma classe para estilização

    // Armazena o índice atual no atributo de dados
    li.setAttribute("data-index", index); // útil para futuras referências

    // Conteúdo do item

    const p = document.createElement("p"); // Parágrafo para o texto da tarefa
    p.textContent = item.task; // Define o texto da tarefa
    if (item.checked) p.classList.add("completed"); // Adiciona classe se estiver concluída

    // Botão de exclusão

    const span = document.createElement("span"); // Span para o botão de exclusão
    span.textContent = "[x]"; // Texto do botão
    span.classList.add("delete-task"); // Adiciona uma classe para estilização

    // Evento de exclusão
    span.addEventListener("click", (e) => {
      e.stopPropagation(); // evita conflito com clique no li
      taskList = taskList.filter((t) => t.task !== item.task); // Remove a tarefa do array
      CreateTask(); // Re-renderiza a lista
    });

    // Toggle de conclusão
    li.addEventListener("click", () => {
      const idx = taskList.findIndex((t) => t.task === item.task); // Encontra o índice da tarefa
      if (idx !== -1) {
        taskList[idx].checked = !taskList[idx].checked; // Alterna o estado de conclusão
        CreateTask(); // ou apenas toggle na classe, mas recriar é mais simples aqui
      }
    });

    li.appendChild(p); // Adiciona o parágrafo ao item da lista
    li.appendChild(span); // Adiciona o botão de exclusão ao item da lista
    ul.appendChild(li); // Adiciona o item à lista
  });
}

// Evento do botão
addBtn.addEventListener("click", addTask); // Adicionar tarefa ao clicar no botão

// Adicionar com Enter
inputTask.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask(); // Adicionar tarefa ao pressionar Enter
});

// Foco no input ao carregar a página
window.addEventListener("load", () => {
  inputTask.focus(); // Mantém o foco no input ao carregar a página
});
