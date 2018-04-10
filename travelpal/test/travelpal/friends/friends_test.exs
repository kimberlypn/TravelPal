defmodule Travelpal.FriendsTest do
  use Travelpal.DataCase

  alias Travelpal.Friends

  describe "friends" do
    alias Travelpal.Friends.Friend

    @valid_attrs %{status: "some status"}
    @update_attrs %{status: "some updated status"}
    @invalid_attrs %{status: nil}

    def friend_fixture(attrs \\ %{}) do
      {:ok, friend} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Friends.create_friend()

      friend
    end

    test "list_friends/0 returns all friends" do
      friend = friend_fixture()
      assert Friends.list_friends() == [friend]
    end

    test "get_friend!/1 returns the friend with given id" do
      friend = friend_fixture()
      assert Friends.get_friend!(friend.id) == friend
    end

    test "create_friend/1 with valid data creates a friend" do
      assert {:ok, %Friend{} = friend} = Friends.create_friend(@valid_attrs)
      assert friend.status == "some status"
    end

    test "create_friend/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Friends.create_friend(@invalid_attrs)
    end

    test "update_friend/2 with valid data updates the friend" do
      friend = friend_fixture()
      assert {:ok, friend} = Friends.update_friend(friend, @update_attrs)
      assert %Friend{} = friend
      assert friend.status == "some updated status"
    end

    test "update_friend/2 with invalid data returns error changeset" do
      friend = friend_fixture()
      assert {:error, %Ecto.Changeset{}} = Friends.update_friend(friend, @invalid_attrs)
      assert friend == Friends.get_friend!(friend.id)
    end

    test "delete_friend/1 deletes the friend" do
      friend = friend_fixture()
      assert {:ok, %Friend{}} = Friends.delete_friend(friend)
      assert_raise Ecto.NoResultsError, fn -> Friends.get_friend!(friend.id) end
    end

    test "change_friend/1 returns a friend changeset" do
      friend = friend_fixture()
      assert %Ecto.Changeset{} = Friends.change_friend(friend)
    end
  end
end
