import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { SiteUser } from "@/types";

interface AddUserDialogProps {
  onAddUser: (user: Omit<SiteUser, "id">) => Promise<void>;
  onClose: () => void;
  error: string | null;
}

export function AddUserDialog({
  onAddUser,
  onClose,
  error,
}: AddUserDialogProps) {
  const [newUser, setNewUser] = useState<Omit<SiteUser, "id">>({
    email: "",
    permissions: {
      addLogs: false,
      editInventory: false,
      deleteLogs: false,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddUser(newUser);
  };

  return (
    <Card className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <CardContent className="bg-white p-6 rounded-lg w-[400px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">User Email</Label>
            <Input
              id="email"
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              placeholder="Enter user email"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <div className="space-y-2">
            <Label>Permissions</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="addLogs"
                  checked={newUser.permissions.addLogs}
                  onCheckedChange={(checked) =>
                    setNewUser({
                      ...newUser,
                      permissions: {
                        ...newUser.permissions,
                        addLogs: checked as boolean,
                      },
                    })
                  }
                />
                <Label htmlFor="addLogs">Add Logs</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="editInventory"
                  checked={newUser.permissions.editInventory}
                  onCheckedChange={(checked) =>
                    setNewUser({
                      ...newUser,
                      permissions: {
                        ...newUser.permissions,
                        editInventory: checked as boolean,
                      },
                    })
                  }
                />
                <Label htmlFor="editInventory">Edit Inventory</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="deleteLogs"
                  checked={newUser.permissions.deleteLogs}
                  onCheckedChange={(checked) =>
                    setNewUser({
                      ...newUser,
                      permissions: {
                        ...newUser.permissions,
                        deleteLogs: checked as boolean,
                      },
                    })
                  }
                />
                <Label htmlFor="deleteLogs">Delete Logs</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add User</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
