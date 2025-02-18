import tkinter as tk
import time
import threading

class AnimatedAvatar(tk.Tk):
    """
    A simple animated avatar using Tkinter.
    This early version simulates an animated avatar for personal assistant tasks.
    """
    def __init__(self, image_path="avatar.png"):
        super().__init__()
        self.title("Animated Avatar - Personal Assistant")
        self.canvas = tk.Canvas(self, width=300, height=300)
        self.canvas.pack()
        # Load an avatar image (provide image_path externally)
        try:
            self.avatar = tk.PhotoImage(file=image_path)
        except Exception as e:
            print(f"Error loading avatar image: {e}")
            self.avatar = None
        if self.avatar:
            self.avatar_item = self.canvas.create_image(150, 150, image=self.avatar)
        self.animate_flag = True
        self.animation_thread = threading.Thread(target=self.animate)
        self.animation_thread.daemon = True
        self.animation_thread.start()

    def animate(self):
        """
        Simple animation: moves the avatar slightly to create a pulsating effect.
        """
        move_distance = 2
        direction = move_distance
        while self.animate_flag:
            self.canvas.move(self.avatar_item, direction, 0)
            pos = self.canvas.coords(self.avatar_item)
            # Reverse direction if near boundaries
            if pos[0] > 170 or pos[0] < 130:
                direction = -direction
            self.update_idletasks()
            time.sleep(0.1)

    def on_close(self):
        self.animate_flag = False
        self.destroy()

if __name__ == '__main__':
    # Start the animated avatar with the provided image path.
    app = AnimatedAvatar(image_path="avatar.png")
    app.protocol("WM_DELETE_WINDOW", app.on_close)
    app.mainloop()