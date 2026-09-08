#!/bin/zsh
# Publica automaticamente as alterações do Trycktrack no GitHub Pages,
# todo dia à noite, mas só se houver algo novo para enviar.

REPO_DIR="/Users/patryckfrota/projects/trycktrack"
LOG_FILE="$REPO_DIR/.auto-push.log"

# PATH mínimo de um LaunchAgent não inclui o git do Homebrew/Xcode por padrão.
export PATH="/usr/bin:/usr/local/bin:/opt/homebrew/bin:$PATH"

cd "$REPO_DIR" || exit 1

{
    echo "----- $(date '+%Y-%m-%d %H:%M:%S') -----"

    if [ -n "$(git status --porcelain)" ]; then
        git add -A
        git commit -m "Atualização automática noturna — $(date '+%d/%m/%Y')"
        if git push origin main; then
            echo "Push enviado com sucesso."
        else
            echo "ERRO: falha ao enviar o push."
        fi
    else
        echo "Nenhuma alteração encontrada — nada a enviar."
    fi
} >> "$LOG_FILE" 2>&1
