let screen_title = document.getElementById("screen_title");
let screen_container = document.getElementById("screen_container");
let last_transection = document.getElementById("last_transection");

database = [
    {
        id: 1,
        name: "Bank",
        balance: 25000,
    },
    {
        id: 2,
        name: "Sakib",
        balance: 25000,
    },
    {
        id: 3,
        name: "Shafin",
        balance: 25000,
    },
    {
        id: 4,
        name: "Hirok",
        balance: 25000,
    },
    {
        id: 5,
        name: "Nazid",
        balance: 25000,
    },
];

let transection_message = "";
let current_screen = "main_menu";
let transection = {
    sender_id: 0,
    receiver_id: 0,
    amount: 0,
};

const get = (id) => {
    for (let player of database) {
        if (player.id == id) {
            return player;
        }
    }
    return null;
};

const clear_transection = () => {
    transection.sender_id = 0;
    transection.receiver_id = 0;
    transection.amount = 0;
};

const set_sender = (id) => {
    transection.sender_id = id;
};

const set_receiver = (id) => {
    transection.receiver_id = id;
};

const set_amount = (amount) => {
    transection.amount = amount;
};

const on_main_menu_button_click = (id) => {
    set_sender(id);
    current_screen = "to_whom";
    render_screen();
};

const on_to_whom_button_click = (id) => {
    set_receiver(id);
    current_screen = "set_amount";
    render_screen();
};

const on_send_button_click = (input_field) => {
    let value = input_field.value;

    if (value === "") {
        return null;
    }

    let amount = parseInt(value);
    set_amount(amount);
    let sender = get(transection.sender_id);
    let receiver = get(transection.receiver_id);
    sender.balance -= amount;
    receiver.balance += amount;
    transection_message = `Last: ${sender.name} sent ${amount} taka to ${receiver.name}.`;
    current_screen = "main_menu";
    render_screen();
};

const on_back_button_click = () => {
    switch (current_screen) {
        case "to_whom":
        case "reset_screen":
            current_screen = "main_menu";
            render_screen();
            break;
        case "set_amount":
            current_screen = "to_whom";
            render_screen();
            break;
        case "reset_screen":
    }
};

const on_update_button_click = () => {
    for (player of database) {
        let input = document.getElementById(`input_${player.id}`);
        let value = input.value;
        if (!value) {
            alert("Please fill all the fields first");
            return null;
        }

        let balance = parseInt(value);
        player.balance = balance;
    }
    current_screen = "main_menu";
    render_screen();
};

const on_reset_button_click = () => {
    current_screen = "reset_screen";
    render_screen();
};

const render_screen = () => {
    screen_container.innerHTML = "";

    switch (current_screen) {
        case "main_menu":
            render_main_menu();
            break;
        case "to_whom":
            render_to_whom();
            break;
        case "set_amount":
            render_set_amount();
            break;
        case "reset_screen":
            render_reset_screen();
            break;
        default:
            console.error("Invalid screen");
    }
};

const render_main_menu = () => {
    screen_title.innerText = "Main Menu";
    clear_transection();

    for (let player of database) {
        let button = document.createElement("button");
        button.innerText = `${player.name} - ${player.balance} Taka`;
        button.onclick = () => on_main_menu_button_click(player.id);
        screen_container.appendChild(button);
    }

    let last_transection = document.createElement("p");
    last_transection.id = "last_transection";
    last_transection.innerText = transection_message;
    screen_container.appendChild(last_transection);

    let blank_box = document.createElement("div");
    blank_box.id = "blank";
    screen_container.appendChild(blank_box);

    let reset_button = document.createElement("button");
    reset_button.innerText = "Reset Balance";
    reset_button.onclick = on_reset_button_click;
    screen_container.appendChild(reset_button);
};

const render_to_whom = () => {
    let sender = get(transection.sender_id).name;
    screen_title.innerText = `${sender} sending money to ...`;
    set_receiver(0);

    for (let player of database) {
        if (player.id != transection.sender_id) {
            let button = document.createElement("button");
            button.innerText = `${player.name}`;
            button.onclick = () => on_to_whom_button_click(player.id);
            screen_container.appendChild(button);
        }
    }

    let back_button = document.createElement("button");
    back_button.innerText = `Back`;
    back_button.id = "back_button";
    back_button.onclick = on_back_button_click;
    screen_container.appendChild(back_button);
};

const render_set_amount = () => {
    let sender_player = get(transection.sender_id).name;
    let receiver_player = get(transection.receiver_id).name;

    screen_title.innerText = `${sender_player} to ${receiver_player}`;
    set_amount(0);

    let input = document.createElement("input");
    input.type = "number";
    input.id = "amount_input";
    screen_container.appendChild(input);

    let send_button = document.createElement("button");
    send_button.innerText = `Send`;
    send_button.id = "send_button";
    send_button.onclick = () => on_send_button_click(input);
    screen_container.appendChild(send_button);

    let back_button = document.createElement("button");
    back_button.innerText = `Back`;
    back_button.id = "back_button";
    back_button.onclick = on_back_button_click;
    screen_container.appendChild(back_button);
};

const render_reset_screen = () => {
    screen_title.innerText = "Reset Balance";

    for (let player of database) {
        let input = document.createElement("input");
        input.type = "number";
        input.id = `input_${player.id}`;
        input.placeholder = `Enter ${player.name}'s balance`;
        input.classList.add("reset_balance");
        screen_container.appendChild(input);
    }

    let update_button = document.createElement("button");
    update_button.innerText = `Update`;
    update_button.id = "update_button";
    update_button.onclick = () => on_update_button_click();
    screen_container.appendChild(update_button);

    let back_button = document.createElement("button");
    back_button.innerText = `Back`;
    back_button.id = "back_button";
    back_button.onclick = on_back_button_click;
    screen_container.appendChild(back_button);
};

render_screen();
