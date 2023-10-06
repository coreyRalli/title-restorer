(function () {
    const mainNode = document.querySelector("main");

    const config = { atributes: false, childList: true, subtree: true };

    const formatLinkText = () => {
        let tweets = document.querySelectorAll('[role="article"]');

        if (tweets) {
            tweets.forEach(node => {
                let link = null;

                // Get the card and link seperately
                const card = node.querySelector(['[data-testid="card.wrapper"]']);

                if (card)
                    link = card.querySelector('a');

                if (card && link) {
                    const label = link.ariaLabel;

                    if (label) {
                        const labelParts = label.split(" ");
                        const domainName = labelParts[0];
                        labelParts.shift();

                        const newLabel = `${labelParts.join(" ")} - ${domainName}`;

                        const linkText = link.querySelector("span");

                        if (linkText) {
                            linkText.textContent = newLabel;
                        }
                    }
                }
            })
        }
    }

    const mutationCallback = (mutationList, observer) => {
        formatLinkText();
    }

    formatLinkText();

    const observer = new MutationObserver(mutationCallback);
    observer.observe(mainNode, config);
})();