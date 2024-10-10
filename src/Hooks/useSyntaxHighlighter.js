import {useEffect} from "react";
import Prism from "prismjs";

function useSyntaxHighlighter(dep1, dep2, dep3) {
  useEffect(() => {
    const highlightCode = (blocks, language) => {
      blocks.forEach((block) => {
        const highlightedHtml = Prism.highlight(block.textContent, Prism.languages[language], language);
        block.innerHTML = highlightedHtml;
      });
    };

    // Function to highlight different languages
    const highlightAllLanguages = () => {
      const jsCodeBlocks = [
        ...document.querySelectorAll("main .language-js"),
        ...document.querySelectorAll("main .language-javascript"),
        ...document.querySelectorAll("main .ql-syntax")
      ];
      const htmlCodeBlocks = document.querySelectorAll("main .language-html");
      const cssCodeBlocks = document.querySelectorAll("main .language-css");

      if (jsCodeBlocks.length) highlightCode(jsCodeBlocks, "javascript");
      if (htmlCodeBlocks.length) highlightCode(htmlCodeBlocks, "html");
      if (cssCodeBlocks.length) highlightCode(cssCodeBlocks, "css");
    };

    // Set custom styles for Quill code blocks
    const styleQuillSyntax = () => {
      const qlCodeContainer = document.querySelectorAll("main .ql-syntax");
      if (qlCodeContainer.length) {
        qlCodeContainer.forEach((qlCodeBlock) =>
          qlCodeBlock.setAttribute(
            "style",
            "color: #e5e7eb; font-size: 1.25rem; background: #1f2937; box-shadow: none; max-width: 100rem; display: block; padding: 1rem; margin: 0 auto; border-radius: 10px; overflow-x: scroll; overflow-wrap:anywhere"
          )
        );
      }
    };

    highlightAllLanguages();
    styleQuillSyntax();
  }, [dep1, dep2, dep3]); // Re-run on dependencies update
}

export default useSyntaxHighlighter;
