<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function onReset() {
        dispatch("reset");
    }
</script>

<input id="but" type="button" value="Reset" on:click="{onReset}" />

<style>
    input {
        color: black;
        font-size: medium;
        border-radius: 3px;
        background-color: white;
    }
</style>