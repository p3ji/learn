// ─── Shared Modal Accessibility Helper ────────────────────────────────────────
// Every modal in this app was previously a bare <div> overlay: no dialog role,
// no focus trap, no Escape key, and no focus restore. A keyboard or screen-reader
// user could tab straight through the page underneath and never reach Close.
//
// Any overlay with class .concept-modal-overlay that becomes visible is picked up
// automatically, so JS-generated modals (the lab modal, the concept deep-dive)
// get the same behaviour as the ones hardcoded in index.html.

const FOCUSABLE = [
    'a[href]', 'button:not([disabled])', 'input:not([disabled])',
    'select:not([disabled])', 'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
].join(',');

let _lastFocusedBeforeModal = null;

function getVisibleModal() {
    const overlays = document.querySelectorAll('.concept-modal-overlay');
    for (const o of overlays) {
        if (o.style.display === 'flex' || o.style.display === 'block') return o;
    }
    return null;
}

function focusablesIn(modal) {
    return Array.from(modal.querySelectorAll(FOCUSABLE))
        .filter(el => el.offsetParent !== null);   // skip hidden (e.g. collapsed <details>)
}

/** Call after opening a modal: stores prior focus and moves focus inside. */
function onModalOpened(modal) {
    if (!modal) return;
    _lastFocusedBeforeModal = document.activeElement;

    if (!modal.hasAttribute('role')) {
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
    }

    const items = focusablesIn(modal);
    const closeBtn = modal.querySelector('.concept-modal-close');
    (closeBtn || items[0] || modal).focus();
}

/** Call after closing: returns focus to whatever opened the modal. */
function onModalClosed() {
    if (_lastFocusedBeforeModal && document.contains(_lastFocusedBeforeModal)) {
        _lastFocusedBeforeModal.focus();
    }
    _lastFocusedBeforeModal = null;
}

function closeAnyOpenModal() {
    const modal = getVisibleModal();
    if (!modal) return false;

    // Prefer the modal's own close handler so component state stays consistent.
    const btn = modal.querySelector('.concept-modal-close');
    if (btn && typeof btn.onclick === 'function') {
        btn.onclick();
    } else {
        modal.style.display = 'none';
    }
    onModalClosed();
    return true;
}

document.addEventListener('keydown', (e) => {
    const modal = getVisibleModal();
    if (!modal) return;

    if (e.key === 'Escape') {
        e.preventDefault();
        closeAnyOpenModal();
        return;
    }

    if (e.key !== 'Tab') return;

    // Cycle focus within the dialog.
    const items = focusablesIn(modal);
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];

    if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
    } else if (!modal.contains(document.activeElement)) {
        e.preventDefault(); first.focus();
    }
});

// Detect modals opened by code that doesn't call onModalOpened directly.
const _modalObserver = new MutationObserver((records) => {
    for (const r of records) {
        const el = r.target;
        if (el.classList && el.classList.contains('concept-modal-overlay') &&
            el.style.display === 'flex' && !el.contains(document.activeElement)) {
            onModalOpened(el);
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.concept-modal-overlay').forEach(m => {
        _modalObserver.observe(m, { attributes: true, attributeFilter: ['style'] });
    });
    // Catch modals appended to <body> later (labModal, conceptModal).
    new MutationObserver((recs) => {
        recs.forEach(r => r.addedNodes.forEach(n => {
            if (n.nodeType === 1 && n.classList && n.classList.contains('concept-modal-overlay')) {
                _modalObserver.observe(n, { attributes: true, attributeFilter: ['style'] });
            }
        }));
    }).observe(document.body, { childList: true });
});
