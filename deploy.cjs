const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando deploy para GitHub Pages...');

// 1. Build do projeto
console.log('📦 Fazendo build...');
execSync('npm run build', { stdio: 'inherit' });

// 2. Criar branch gh-pages
console.log('🌿 Criando branch gh-pages...');
try {
  execSync('git checkout --orphan gh-pages', { stdio: 'inherit' });
} catch (e) {
  execSync('git checkout gh-pages', { stdio: 'inherit' });
}

// 3. Limpar arquivos
console.log('🧹 Limpando arquivos...');
execSync('git rm -rf .', { stdio: 'inherit' });

// 4. Copiar arquivos do dist
console.log('📋 Copiando arquivos compilados...');
execSync('xcopy /E /I /Y dist\\* .', { stdio: 'inherit' });

// 5. Adicionar arquivos
console.log('➕ Adicionando arquivos...');
execSync('git add .', { stdio: 'inherit' });

// 6. Commit
console.log('💾 Fazendo commit...');
execSync('git commit -m "Deploy to GitHub Pages"', { stdio: 'inherit' });

// 7. Push
console.log('🚀 Enviando para GitHub...');
execSync('git push origin gh-pages', { stdio: 'inherit' });

// 8. Voltar para main
console.log('↩️ Voltando para branch main...');
execSync('git checkout main', { stdio: 'inherit' });

console.log('✅ Deploy concluído!');
console.log('🌐 Seu site estará disponível em: https://victorhgutierrez-cloud.github.io/Propostas-BR/');
