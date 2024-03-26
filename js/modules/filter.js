export default function filter(){
    document.getElementById('filter-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const searchTerm = document.getElementById('search').value.toLowerCase().trim();
    const selectedUrgency = document.getElementById('urgency').value;
    const selectedStatus = document.getElementById('status').value;

    const cardItems = document.getElementsByClassName('card-wrapper');

    for (const card of cardItems) {
        const cardHeader = card.querySelector('.card-header').textContent.toLowerCase();
        const listGroupItem = card.querySelector('.list-group-item').textContent.toLowerCase();
        const cardUrgency = card.querySelector('.dropdown-item').textContent;
        const cardStatus = card.querySelector('.dropdown-itemH').textContent;

        const nameFilter = cardHeader.includes(searchTerm) || listGroupItem.includes(searchTerm);
        const urgencyFilter = selectedUrgency === 'all' || cardUrgency === selectedUrgency;
        const statusFilter = selectedStatus === 'all' || cardStatus === selectedStatus;

        if (nameFilter && urgencyFilter && statusFilter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    }
});
}