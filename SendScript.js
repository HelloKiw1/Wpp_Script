async function enviarScript(scriptText) {
  const lines = scriptText
    .split(/[\n\t]+/)
    .map(line => line.trim())
    .filter(line => line);

  const main = document.querySelector("#main");
  if (!main) throw new Error("❌ Nenhuma conversa aberta!");

  const textarea = main.querySelector('div[contenteditable="true"]');
  if (!textarea) throw new Error("❌ Campo de mensagem não encontrado!");

  for (const [index, line] of lines.entries()) {
    console.log(`➡️ Enviando: ${line}`);

    // Escreve a mensagem
    textarea.focus();
    document.execCommand("insertText", false, line);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));

    await new Promise(resolve => setTimeout(resolve, 300));

    // Novo seletor do botão de enviar
    let sendButton = main.querySelector('button[aria-label="Enviar"]');

    if (!sendButton) {
      console.error("⚠️ Botão de enviar não encontrado, tentando novamente...");
      await new Promise(resolve => setTimeout(resolve, 500));
      sendButton = main.querySelector('button[aria-label="Enviar"]');
    }

    if (sendButton) {
      sendButton.click();
      console.log(`✅ Mensagem enviada (${index + 1}/${lines.length})`);
    } else {
      console.error("❌ Não consegui encontrar o botão de enviar!");
    }

    // Intervalo entre mensagens
    if (index < lines.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 700));
    }
  }

  return lines.length;
}

enviarScript(`

Adicionar
o
Texto
Aqui

`).then(qtd =>
  console.log(`🎉 Código finalizado, ${qtd} mensagens enviadas!`)
).catch(console.error);
